package in.InvestHub.Backend.Controllers;

import in.InvestHub.Backend.Models.Portfolio;
import in.InvestHub.Backend.Payloads.ApiResponse;
import in.InvestHub.Backend.Services.PortfolioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/portfolio")
public class PortfolioController {

  @Autowired
  private PortfolioService portfolioService;

  @PostMapping("/")
  public ResponseEntity<Portfolio> createPortfolio(@RequestBody Portfolio portfolio) {
    Portfolio createdPortfolio = this.portfolioService.createPortfolio(portfolio);
    return new ResponseEntity<>(createdPortfolio, HttpStatus.CREATED);
  }

  @PutMapping("/{portfolio_id}")
  public ResponseEntity<Portfolio> updatePortfolio(@RequestBody Portfolio portfolio, @PathVariable Long portfolio_id) {
    Portfolio updatedPortfolio = this.portfolioService.updatePortfolio(portfolio, portfolio_id);
    return ResponseEntity.ok(updatedPortfolio);
  }

  @DeleteMapping("/{portfolio_id}")
  public ResponseEntity<?> deletePortfolio(@PathVariable Long portfolio_id) {
    this.portfolioService.deletePortfolio(portfolio_id);
    return new ResponseEntity<ApiResponse>(new ApiResponse("Portfolio deleted successfully", true), HttpStatus.OK);

  }

  @GetMapping("/")
  public ResponseEntity<List<Portfolio>> getAllPortfolios() {
    return ResponseEntity.ok(this.portfolioService.getAllPortfolio());
  }

  @GetMapping("/{portfolio_id}")
  public ResponseEntity<Portfolio> getSinglePortfolio(@PathVariable Long portfolio_id) {
    return ResponseEntity.ok(this.portfolioService.getPortfolioById(portfolio_id));
  }
}
