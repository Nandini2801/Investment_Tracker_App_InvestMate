package in.InvestHub.Backend.Controllers;

import in.InvestHub.Backend.Models.Stock;
import in.InvestHub.Backend.Services.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stocks")
public class StockController {
  private final StockService stockService;

  @Autowired
  public StockController(StockService stockService) {
    this.stockService = stockService;
  }

  @GetMapping("/{id}")
  public ResponseEntity<Stock> getStockById(@PathVariable Long id) {
    Stock stock = stockService.findStockById(id);
    if (stock != null) {
      return ResponseEntity.ok(stock);
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @GetMapping("/")
  public List<Stock> getAllStocks() {
    return stockService.findAllStocks();
  }

  @PostMapping("/")
  public ResponseEntity<Stock> createStock(@RequestBody Stock stock) {
    Stock createdStock = stockService.createStock(stock);
    return new ResponseEntity<>(createdStock, HttpStatus.CREATED);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Stock> updateStock(@PathVariable Long id, @RequestBody Stock updatedStock) {
    Stock updated = stockService.updateStock(id, updatedStock);
    if (updated != null) {
      return ResponseEntity.ok(updated);
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteStock(@PathVariable Long id) {
    stockService.deleteStock(id);
    return ResponseEntity.ok().build();
  }
}
