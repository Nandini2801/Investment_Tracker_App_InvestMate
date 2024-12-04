package in.InvestHub.Backend.Controllers;

import in.InvestHub.Backend.Models.BankDetails;
import in.InvestHub.Backend.Payloads.ApiResponse;
import in.InvestHub.Backend.Services.BankDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bankdetails")
public class BankDetailsController {

  @Autowired
  private BankDetailsService bankDetailsService;

  @PostMapping("/{userId}")
  public ResponseEntity<BankDetails> createUser(@RequestBody BankDetails bankDetails, @PathVariable Long userId) {

    BankDetails createdAccount = this.bankDetailsService.register(bankDetails, userId);
    return new ResponseEntity<>(createdAccount, HttpStatus.CREATED);
  }

  @PutMapping("/{accNo}")
  public ResponseEntity<BankDetails> updateAccount(@RequestBody BankDetails bankDetails, @PathVariable String accNo) {
    BankDetails updatedAccount = this.bankDetailsService.updateAccount(bankDetails, accNo);
    return ResponseEntity.ok(updatedAccount);
  }

  @DeleteMapping("/{accNo}")
  public ResponseEntity<?> deleteAccount(@PathVariable String accNo) {
    this.bankDetailsService.deleteAccount(accNo);
    return new ResponseEntity<>(new ApiResponse("Account deleted successfully", true), HttpStatus.OK);

  }

  @GetMapping("/")
  public ResponseEntity<List<BankDetails>> getAllAccounts() {
    return ResponseEntity.ok(this.bankDetailsService.getAllAccounts());
  }

  @GetMapping("/{accNo}")
  public ResponseEntity<BankDetails> getSingleAccount(@PathVariable String accNo) {
    return ResponseEntity.ok(this.bankDetailsService.getAccountByAccNo(accNo));
  }
}
