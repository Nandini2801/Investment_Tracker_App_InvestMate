package in.InvestHub.Backend.Repositories;

import in.InvestHub.Backend.Models.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepo extends JpaRepository<Transaction, Long> {
  List<Transaction> findByPortfolioId(Long id);
}
