package in.InvestHub.Backend.Services;

import in.InvestHub.Backend.Models.Stock;
import in.InvestHub.Backend.Repositories.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StockServiceImpl implements StockService {
  private final StockRepository stockRepository;

  @Autowired
  public StockServiceImpl(StockRepository stockRepository) {
    this.stockRepository = stockRepository;
  }

  @Override
  public Stock findStockById(Long id) {
    return stockRepository.findById(id).orElse(null);
  }

  @Override
  public List<Stock> findAllStocks() {
    return stockRepository.findAll();
  }

  @Override
  public Stock createStock(Stock stock) {
    return stockRepository.save(stock);
  }

  @Override
  public Stock updateStock(Long id, Stock updatedStock) {
    Optional<Stock> existingStockOptional = stockRepository.findById(id);

    if (!existingStockOptional.isPresent()) {
      return null; // Handle not found
    }

    Stock existingStock = existingStockOptional.get();

    // Update fields of the existing stock with the new values
    existingStock.setName(updatedStock.getName());
    existingStock.setSymbol(updatedStock.getSymbol());

    return stockRepository.save(existingStock);
  }

  @Override
  public void deleteStock(Long id) {
    stockRepository.deleteById(id);
  }
}
