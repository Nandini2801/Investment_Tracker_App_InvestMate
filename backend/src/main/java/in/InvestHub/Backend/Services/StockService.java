package in.InvestHub.Backend.Services;

import in.InvestHub.Backend.Models.Stock;

import java.util.List;

public interface StockService {
  Stock findStockById(Long id);

  List<Stock> findAllStocks();

  Stock createStock(Stock stock);

  Stock updateStock(Long id, Stock updatedStock);

  void deleteStock(Long id);
}
