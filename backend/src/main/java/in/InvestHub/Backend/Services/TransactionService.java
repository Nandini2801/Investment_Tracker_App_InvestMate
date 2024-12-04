package in.InvestHub.Backend.Services;

import in.InvestHub.Backend.Models.Transaction;

import java.util.List;

public interface TransactionService {

  Transaction findById(Long id);

  List<Transaction> findAll();

  Transaction save(Transaction transaction);

  void delete(Long id);

  List<Transaction> getTransactionsWithStockInfo();
}
