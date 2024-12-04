package in.InvestHub.Backend.Controllers;

import in.InvestHub.Backend.Models.Transaction;
import in.InvestHub.Backend.Services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

  @Autowired
  private TransactionService transactionService;

  @GetMapping("/")
  public ResponseEntity<List<Transaction>> getWithInfo() {
    return ResponseEntity.ok(transactionService.getTransactionsWithStockInfo());
  }

  @GetMapping("")
  public ResponseEntity<List<Transaction>> getAllTransactions() {
    List<Transaction> transactions = transactionService.findAll();
    return ResponseEntity.ok(transactions);
  }

  @PostMapping("/")
  public ResponseEntity<Transaction> createTransaction(@RequestBody Transaction transactionHistory) {
    Transaction createdTransaction = transactionService.save(transactionHistory);
    return ResponseEntity.ok(createdTransaction);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteTransaction(@PathVariable Long id) {
    transactionService.delete(id);
    return ResponseEntity.noContent().build();
  }

  @GetMapping("/{id}")
  public ResponseEntity<Transaction> getTransactionById(@PathVariable Long id) {
    Transaction transaction = transactionService.findById(id);
    if (transaction != null) {
      return ResponseEntity.ok(transaction);
    } else {
      return ResponseEntity.notFound().build();
    }
  }
}
