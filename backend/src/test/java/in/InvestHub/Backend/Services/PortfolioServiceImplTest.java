package in.InvestHub.Backend.Services;

import in.InvestHub.Backend.Exception.ResourceNotFoundException;
import in.InvestHub.Backend.Models.Portfolio;
import in.InvestHub.Backend.Repositories.PortfolioRepo;
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
class PortfolioServiceImplTest {

  @Mock
  private PortfolioRepo portfolioRepo;

  @InjectMocks
  private PortfolioServiceImpl portfolioService;

  private Portfolio samplePortfolio;

  @BeforeEach
  public void setUp() {
    samplePortfolio = new Portfolio();
    samplePortfolio.setId(1L);
    samplePortfolio.setCategory("Sample Category");
    samplePortfolio.setCreatedAt(new Date());
    samplePortfolio.setCreatedPrice(BigDecimal.valueOf(100.0));
    samplePortfolio.setCurrentPrice(BigDecimal.valueOf(105.0));
  }

  @Test
  public void testCreatePortfolio() {
    when(portfolioRepo.save(any(Portfolio.class))).thenReturn(samplePortfolio);

    Portfolio createdPortfolio = portfolioService.createPortfolio(samplePortfolio);

    assertNotNull(createdPortfolio);
    assertEquals(samplePortfolio, createdPortfolio);

    verify(portfolioRepo, times(1)).save(samplePortfolio);
  }

  @Test
  public void testUpdatePortfolio() {
    Long portfolioId = samplePortfolio.getId();
    Portfolio updatedPortfolio = new Portfolio();
    updatedPortfolio.setCategory("Updated Category");

    when(portfolioRepo.findById(portfolioId)).thenReturn(Optional.of(samplePortfolio));
    when(portfolioRepo.save(samplePortfolio)).thenReturn(updatedPortfolio);

    Portfolio result = portfolioService.updatePortfolio(updatedPortfolio, portfolioId);

    assertNotNull(result);
    assertEquals("Updated Category", result.getCategory());

    verify(portfolioRepo, times(1)).findById(portfolioId);
    verify(portfolioRepo, times(1)).save(samplePortfolio);
  }

  @Test
  public void testGetPortfolioById() {
    Long portfolioId = samplePortfolio.getId();
    when(portfolioRepo.findById(portfolioId)).thenReturn(Optional.of(samplePortfolio));

    Portfolio result = portfolioService.getPortfolioById(portfolioId);

    assertNotNull(result);
    assertEquals(samplePortfolio, result);

    verify(portfolioRepo, times(1)).findById(portfolioId);
  }

  @Test
  public void testGetPortfolioByIdNotFound() {
    Long portfolioId = 2L;
    when(portfolioRepo.findById(portfolioId)).thenReturn(Optional.empty());

    assertThrows(ResourceNotFoundException.class, () -> portfolioService.getPortfolioById(portfolioId));

    verify(portfolioRepo, times(1)).findById(portfolioId);
  }

  @Test
  public void testGetAllPortfolio() {
    List<Portfolio> portfolioList = new ArrayList<>();
    portfolioList.add(samplePortfolio);
    when(portfolioRepo.findAll()).thenReturn(portfolioList);

    List<Portfolio> result = portfolioService.getAllPortfolio();

    assertNotNull(result);
    assertEquals(portfolioList, result);

    verify(portfolioRepo, times(1)).findAll();
  }

  @Test
  public void testDeletePortfolio() {
    Long portfolioId = samplePortfolio.getId();

    when(portfolioRepo.findById(portfolioId)).thenReturn(Optional.of(samplePortfolio));

    portfolioService.deletePortfolio(portfolioId);

    verify(portfolioRepo, times(1)).findById(portfolioId);
    verify(portfolioRepo, times(1)).delete(samplePortfolio);
  }

  @Test
  public void testDeletePortfolioNotFound() {
    Long portfolioId = 2L;
    when(portfolioRepo.findById(portfolioId)).thenReturn(Optional.empty());

    assertThrows(ResourceNotFoundException.class, () -> portfolioService.deletePortfolio(portfolioId));

    verify(portfolioRepo, times(1)).findById(portfolioId);
    verify(portfolioRepo, never()).delete(any());
  }
}
