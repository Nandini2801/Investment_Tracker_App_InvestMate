package in.InvestHub.Backend.Services;

import in.InvestHub.Backend.Models.Price;

import java.util.List;

public interface PriceService {

  Price createPrice(Price price);

  Price updatePrice(Price price, Long price_id);

  Price getPriceById(Long price_id);

  List<Price> getAllPrice();

  void deletePrice(Long price_id);
}
