package in.InvestHub.Backend.Services;

import in.InvestHub.Backend.Exception.ResourceNotFoundException;
import in.InvestHub.Backend.Models.Price;
import in.InvestHub.Backend.Repositories.PriceRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PriceServiceImpl implements PriceService {

  @Autowired
  private PriceRepo priceRepo;

  @Override
  public Price createPrice(Price price) {
    Price savedPrice = this.priceRepo.save(price);
    return savedPrice;
  }

  @Override
  public Price updatePrice(Price price, Long price_id) {
    Price updatePrice = this.priceRepo.findById(price_id).orElseThrow(() -> new ResourceNotFoundException("Price", "id", String.valueOf(price_id)));
    updatePrice.setOpenPrice(price.getOpenPrice());
    updatePrice.setLowPrice(price.getLowPrice());
    updatePrice.setHighPrice(price.getHighPrice());
    updatePrice.setDate(price.getDate());
    updatePrice.setClosePrice(price.getClosePrice());
    return this.priceRepo.save(updatePrice);
  }

  @Override
  public Price getPriceById(Long price_id) {
    Price priceGet = this.priceRepo.findById(price_id).orElseThrow(() -> new ResourceNotFoundException("Price", "id", String.valueOf(price_id)));
    return priceGet;
  }

  @Override
  public List<Price> getAllPrice() {
    List<Price> prices = this.priceRepo.findAll();
    return prices;
  }

  @Override
  public void deletePrice(Long price_id) {
    Price price = this.priceRepo.findById(price_id).orElseThrow(() -> new ResourceNotFoundException("Price", "id", String.valueOf(price_id)));
    this.priceRepo.delete(price);
  }
}
