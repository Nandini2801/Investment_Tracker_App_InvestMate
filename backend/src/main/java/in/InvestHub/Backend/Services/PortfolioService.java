package in.InvestHub.Backend.Services;

import in.InvestHub.Backend.Models.Portfolio;

import java.util.List;

public interface PortfolioService {

  Portfolio createPortfolio(Portfolio portfolio);

  Portfolio updatePortfolio(Portfolio portfolio, Long portfolio_id);

  Portfolio getPortfolioById(Long portfolio_id);

  List<Portfolio> getAllPortfolio();

  void deletePortfolio(Long portfolio_id);

  List<Portfolio> getPortfolioByUserId(Long id);
}
