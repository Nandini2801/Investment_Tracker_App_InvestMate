package in.InvestHub.Backend.Controllers;

import in.InvestHub.Backend.Models.Price;
import in.InvestHub.Backend.Payloads.ApiResponse;
import in.InvestHub.Backend.Services.PriceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/price")
public class PriceController {
  @Autowired
  private PriceService priceService;

  @PostMapping("/")
  public ResponseEntity<Price> createPrice(@RequestBody Price price) {
    Price createdPrice = this.priceService.createPrice(price);
    return new ResponseEntity<>(createdPrice, HttpStatus.CREATED);
  }

  @PutMapping("/{price_id}")
  public ResponseEntity<Price> updatePrice(@RequestBody Price price, @PathVariable Long price_id) {
    Price updatedPrice = this.priceService.updatePrice(price, price_id);
    return ResponseEntity.ok(updatedPrice);
  }

  @DeleteMapping("/{price_id}")
  public ResponseEntity<?> deletePrice(@PathVariable Long price_id) {
    this.priceService.deletePrice(price_id);
    return new ResponseEntity<ApiResponse>(new ApiResponse("Price deleted successfully", true), HttpStatus.OK);

  }

  @GetMapping("/")
  public ResponseEntity<List<Price>> getAllPrices() {
    return ResponseEntity.ok(this.priceService.getAllPrice());
  }

  @GetMapping("/{price_id}")
  public ResponseEntity<Price> getSingleAccount(@PathVariable Long price_id) {
    return ResponseEntity.ok(this.priceService.getPriceById(price_id));
  }
}
