package in.InvestHub.Backend.Services;

import in.InvestHub.Backend.Models.Transaction;
import in.InvestHub.Backend.Repositories.StockRepository;
import in.InvestHub.Backend.Repositories.TransactionRepo;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionServiceImpl implements TransactionService {
  private final TransactionRepo repository;
  private final StockRepository stockRepository;
  @PersistenceContext
  private EntityManager entityManager;

  @Autowired
  public TransactionServiceImpl(TransactionRepo repository, StockRepository stockRepository) {
    this.repository = repository;
    this.stockRepository = stockRepository;
  }

  @Override
  public Transaction findById(Long id) {
    return repository.findById(id).orElse(null);
  }

  @Override
  public List<Transaction> findAll() {
    return repository.findAll();
  }


  @Override
  public Transaction save(Transaction transaction) {
    return repository.save(transaction);
  }

  @Override
  public void delete(Long id) {
    repository.deleteById(id);
  }

  @Override
  public List<Transaction> getTransactionsWithStockInfo() {
    String jpql = "SELECT NEW in.InvestHub.Backend.Payloads.TransactionDto t (t.id, t.portfolio, t.stock, t.action, t.quantity, t.date) " +
                      "FROM Transaction t JOIN FETCH t.stock";
    return entityManager.createQuery(jpql, Transaction.class).getResultList();
  }
}
