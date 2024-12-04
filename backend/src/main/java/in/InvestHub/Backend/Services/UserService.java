package in.InvestHub.Backend.Services;

import in.InvestHub.Backend.Models.User;

import java.util.List;

public interface UserService {

  User createUser(User user);

  User updateUser(User user, Long userId);

  User getUserById(Long userId);

  List<User> getAllUsers();

  void deleteUser(Long userId);

  User findByEmail(String email);
}
