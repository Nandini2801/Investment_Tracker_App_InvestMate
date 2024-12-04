package in.InvestHub.Backend.Services;

import in.InvestHub.Backend.Exception.ResourceNotFoundException;
import in.InvestHub.Backend.Models.Portfolio;
import in.InvestHub.Backend.Models.PortfolioStocks;
import in.InvestHub.Backend.Repositories.PortfolioRepo;
import in.InvestHub.Backend.Repositories.PriceRepo;
import in.InvestHub.Backend.Repositories.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class PortfolioServiceImpl implements PortfolioService {

  @Autowired
  private PortfolioRepo portfolioRepo;

  @Autowired
  private PriceRepo priceRepo;
  @Autowired
  private StockRepository stockRepo;


  @Override
  public Portfolio createPortfolio(Portfolio portfolio) {
    Portfolio savedPortfolio = this.portfolioRepo.save(portfolio);
    return savedPortfolio;
  }

  @Override
  public Portfolio updatePortfolio(Portfolio portfolio, Long portfolio_id) {
    Portfolio updatePortfolio = this.portfolioRepo.findById(portfolio_id).orElseThrow(() -> new ResourceNotFoundException("Portfolio", "id", String.valueOf(portfolio_id)));
    updatePortfolio.setCategory(portfolio.getCategory());
    updatePortfolio.setCreatedAt(portfolio.getCreatedAt());
    updatePortfolio.setCreatedPrice(portfolio.getCreatedPrice());
    updatePortfolio.setCurrentPrice(portfolio.getCurrentPrice());
    Portfolio updatedPortfolio = this.portfolioRepo.save(updatePortfolio);
    return updatedPortfolio;
  }

  @Override
  public Portfolio getPortfolioById(Long portfolio_id) {
    Portfolio getPortfolio = this.portfolioRepo.findById(portfolio_id).orElseThrow(() -> new ResourceNotFoundException("Portfolio", "id", String.valueOf(portfolio_id)));
    return getPortfolio;
  }

  @Override
  public List<Portfolio> getAllPortfolio() {
    List<Portfolio> portfolios = this.portfolioRepo.findAll();
    return portfolios;
  }

  @Override
  public void deletePortfolio(Long portfolio_id) {
    Portfolio deletePortfolio = this.portfolioRepo.findById(portfolio_id).orElseThrow(() -> new ResourceNotFoundException("Portfolio", "id", String.valueOf(portfolio_id)));
    this.portfolioRepo.delete(deletePortfolio);
  }

  @Override
  public List<Portfolio> getPortfolioByUserId(Long id) {
    List<Portfolio> list = portfolioRepo.findAll().stream().filter(portfolio -> portfolio.getUser().getId() == id).toList();
    for (Portfolio p : list) {
      BigDecimal totalPrice = BigDecimal.ZERO;
      for (PortfolioStocks s : p.getStocks()) {
        s.setStockName(stockRepo.findById(s.getStockId()).get().getName());
        BigDecimal stockPrice = priceRepo.findById(s.getStockId()).isPresent() ? priceRepo.findById(s.getStockId()).get().getClosePrice() : BigDecimal.valueOf(0);
        BigDecimal stockTotalPrice = stockPrice.multiply(BigDecimal.valueOf(s.getQuantity()));
        totalPrice = totalPrice.add(stockTotalPrice);
      }
      p.setCurrentPrice(totalPrice);
    }
    return list;
  }
}
