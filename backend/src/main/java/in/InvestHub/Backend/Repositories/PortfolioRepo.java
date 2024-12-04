package in.InvestHub.Backend.Repositories;

import in.InvestHub.Backend.Models.Portfolio;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PortfolioRepo extends JpaRepository<Portfolio, Long> {
}
