package in.InvestHub.Backend.Controllers;

import in.InvestHub.Backend.Models.User;
import in.InvestHub.Backend.Payloads.ApiResponse;
import in.InvestHub.Backend.Payloads.JwtUtil;
import in.InvestHub.Backend.Payloads.LoginRequest;
import in.InvestHub.Backend.Payloads.LoginResponse;
import in.InvestHub.Backend.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

  @Autowired
  private UserService userService;
  @Autowired
  private JwtUtil jwtUtil;

  @PostMapping("/")
  public ResponseEntity<User> createUser(@RequestBody User user) {
    User createdUser = this.userService.createUser(user);
    return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
  }

  @PutMapping("/{userId}")
  public ResponseEntity<User> updateUser(@RequestBody User User, @PathVariable Long userId) {
    User updatedUser = this.userService.updateUser(User, userId);
    return ResponseEntity.ok(updatedUser);
  }

  @DeleteMapping("/{userId}")
  public ResponseEntity<?> deleteUser(@PathVariable Long userId) {
    this.userService.deleteUser(userId);
    return new ResponseEntity<>(new ApiResponse("User deleted successfully", true), HttpStatus.OK);

  }

  @GetMapping("")
  public ResponseEntity<List<User>> getAllUsers() {
    return ResponseEntity.ok(this.userService.getAllUsers());
  }

  @GetMapping("/{userId}")
  public ResponseEntity<User> getSingleUser(@PathVariable Long userId) {
    return ResponseEntity.ok(this.userService.getUserById(userId));
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
    User user = userService.findByEmail(loginRequest.getEmail());

    if (user != null && user.getPassword().equals(loginRequest.getPassword())) {
      // Authentication successful
      String token = jwtUtil.generateToken(user.getEmail());
      return ResponseEntity.ok(new LoginResponse(token, user.getId()));
    } else {
      // Authentication failed
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new LoginResponse("Authentication failed", 0L));
    }
  }
}
