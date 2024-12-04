package in.InvestHub.Backend.Services;

import in.InvestHub.Backend.Exception.ResourceNotFoundException;
import in.InvestHub.Backend.Models.Price;
import in.InvestHub.Backend.Repositories.PriceRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PriceServiceImplTest {

  @Mock
  private PriceRepo priceRepo;

  @InjectMocks
  private PriceServiceImpl priceService;

  private Price samplePrice;

  @BeforeEach
  public void setUp() {
    samplePrice = new Price();
    samplePrice.setId(1L);
    samplePrice.setDate(new Date());
    samplePrice.setOpenPrice(BigDecimal.valueOf(100.0));
    samplePrice.setHighPrice(BigDecimal.valueOf(110.0));
    samplePrice.setLowPrice(BigDecimal.valueOf(90.0));
    samplePrice.setClosePrice(BigDecimal.valueOf(105.0));
  }

  @Test
  public void testCreatePrice() {
    when(priceRepo.save(any(Price.class))).thenReturn(samplePrice);

    Price createdPrice = priceService.createPrice(samplePrice);

    assertNotNull(createdPrice);
    assertEquals(samplePrice, createdPrice);

    verify(priceRepo, times(1)).save(samplePrice);
  }

  @Test
  public void testUpdatePrice() {
    Long priceId = samplePrice.getId();
    Price updatedPrice = new Price();
    updatedPrice.setOpenPrice(BigDecimal.valueOf(120.0));

    when(priceRepo.findById(priceId)).thenReturn(Optional.of(samplePrice));
    when(priceRepo.save(samplePrice)).thenReturn(updatedPrice);

    Price result = priceService.updatePrice(updatedPrice, priceId);

    assertNotNull(result);
    assertEquals(0, updatedPrice.getOpenPrice().compareTo(result.getOpenPrice())); // Compare using compareTo

    verify(priceRepo, times(1)).findById(priceId);
    verify(priceRepo, times(1)).save(samplePrice);
  }


  @Test
  public void testGetPriceById() {
    Long priceId = samplePrice.getId();
    when(priceRepo.findById(priceId)).thenReturn(Optional.of(samplePrice));

    Price result = priceService.getPriceById(priceId);

    assertNotNull(result);
    assertEquals(samplePrice, result);

    verify(priceRepo, times(1)).findById(priceId);
  }

  @Test
  public void testGetPriceByIdNotFound() {
    Long priceId = 2L;
    when(priceRepo.findById(priceId)).thenReturn(Optional.empty());

    assertThrows(ResourceNotFoundException.class, () -> priceService.getPriceById(priceId));

    verify(priceRepo, times(1)).findById(priceId);
  }

  @Test
  public void testGetAllPrice() {
    List<Price> priceList = new ArrayList<>();
    priceList.add(samplePrice);
    when(priceRepo.findAll()).thenReturn(priceList);

    List<Price> result = priceService.getAllPrice();

    assertNotNull(result);
    assertEquals(priceList, result);

    verify(priceRepo, times(1)).findAll();
  }

  @Test
  public void testDeletePrice() {
    Long priceId = samplePrice.getId();

    when(priceRepo.findById(priceId)).thenReturn(Optional.of(samplePrice));

    priceService.deletePrice(priceId);

    verify(priceRepo, times(1)).findById(priceId);
    verify(priceRepo, times(1)).delete(samplePrice);
  }

  @Test
  public void testDeletePriceNotFound() {
    Long priceId = 2L;
    when(priceRepo.findById(priceId)).thenReturn(Optional.empty());

    assertThrows(ResourceNotFoundException.class, () -> priceService.deletePrice(priceId));

    verify(priceRepo, times(1)).findById(priceId);
    verify(priceRepo, never()).delete(any());
  }
}
