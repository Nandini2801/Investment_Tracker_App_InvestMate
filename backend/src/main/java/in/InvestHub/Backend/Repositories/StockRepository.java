package in.InvestHub.Backend.Repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import in.InvestHub.Backend.Models.Stock;

public interface StockRepository extends JpaRepository<Stock, Long> {
}