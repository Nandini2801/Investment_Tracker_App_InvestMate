package in.InvestHub.Backend.Services;

import in.InvestHub.Backend.Models.Stock;
import in.InvestHub.Backend.Repositories.StockRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class StockServiceImplTest {

  @Mock
  private StockRepository stockRepository;

  @InjectMocks
  private StockServiceImpl stockService;

  private Stock sampleStock;

  @BeforeEach
  public void setUp() {
    sampleStock = new Stock();
    sampleStock.setId(1L);
    sampleStock.setName("Sample Stock");
    sampleStock.setSymbol("SAMPLE");
  }

  @Test
  public void testFindStockById() {
    Long stockId = sampleStock.getId();
    when(stockRepository.findById(stockId)).thenReturn(Optional.of(sampleStock));

    Stock result = stockService.findStockById(stockId);

    assertNotNull(result);
    assertEquals(sampleStock, result);

    verify(stockRepository, times(1)).findById(stockId);
  }

  @Test
  public void testFindStockByIdNotFound() {
    Long stockId = 2L;
    when(stockRepository.findById(stockId)).thenReturn(Optional.empty());

    Stock result = stockService.findStockById(stockId);

    assertNull(result);

    verify(stockRepository, times(1)).findById(stockId);
  }

  @Test
  public void testFindAllStocks() {
    List<Stock> stockList = new ArrayList<>();
    stockList.add(sampleStock);
    when(stockRepository.findAll()).thenReturn(stockList);

    List<Stock> result = stockService.findAllStocks();

    assertNotNull(result);
    assertEquals(stockList, result);

    verify(stockRepository, times(1)).findAll();
  }

  @Test
  public void testCreateStock() {
    when(stockRepository.save(any(Stock.class))).thenReturn(sampleStock);

    Stock createdStock = stockService.createStock(sampleStock);

    assertNotNull(createdStock);
    assertEquals(sampleStock, createdStock);

    verify(stockRepository, times(1)).save(sampleStock);
  }

  @Test
  public void testUpdateStock() {
    Long stockId = sampleStock.getId();
    Stock updatedStock = new Stock();
    updatedStock.setName("Updated Stock");
    updatedStock.setSymbol("UPDATED");

    when(stockRepository.findById(stockId)).thenReturn(Optional.of(sampleStock));
    when(stockRepository.save(sampleStock)).thenReturn(updatedStock);

    Stock result = stockService.updateStock(stockId, updatedStock);

    assertNotNull(result);
    assertEquals(updatedStock, result);

    verify(stockRepository, times(1)).findById(stockId);
    verify(stockRepository, times(1)).save(sampleStock);
  }

  @Test
  public void testUpdateStockNotFound() {
    Long stockId = 2L;
    Stock updatedStock = new Stock();
    updatedStock.setName("Updated Stock");
    updatedStock.setSymbol("UPDATED");

    when(stockRepository.findById(stockId)).thenReturn(Optional.empty());

    Stock result = stockService.updateStock(stockId, updatedStock);

    assertNull(result);

    verify(stockRepository, times(1)).findById(stockId);
    verify(stockRepository, never()).save(any());
  }

  @Test
  public void testDeleteStock() {
    Long stockId = sampleStock.getId();

    stockService.deleteStock(stockId);

    verify(stockRepository, times(1)).deleteById(stockId);
  }
}
