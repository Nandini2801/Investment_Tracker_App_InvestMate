package in.InvestHub.Backend.Services;

import in.InvestHub.Backend.Exception.ResourceNotFoundException;
import in.InvestHub.Backend.Models.User;
import in.InvestHub.Backend.Repositories.BankDetailsRepo;
import in.InvestHub.Backend.Repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class UserServiceImpl implements UserService {

  @Autowired
  private UserRepo userRepo;

  @Autowired
  private BankDetailsRepo bankDetailsRepo;

  @Override
  public User createUser(User user) {
    userRepo.save(user);
    return this.userRepo.save(user);
  }

  @Override
  public User updateUser(User user, Long userId) {
    User userUpdate = this.userRepo.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "id", String.valueOf(userId)));
    userUpdate.setFname(user.getFname());
    userUpdate.setLname(user.getLname());
    userUpdate.setDob(user.getDob());
    userUpdate.setEmail(user.getEmail());
    userUpdate.setGender(user.getGender());
    userUpdate.setAddress(user.getAddress());
    userUpdate.setPhone(user.getPhone());
    userUpdate.setPassword(user.getPassword());

    return this.userRepo.save(userUpdate);
  }

  @Override
  public User getUserById(Long userId) {
    if (userRepo.existsById(userId)) {
      return userRepo.findAll().stream().filter(user -> Objects.equals(user.getId(), userId)).toList().get(0);
    }
    throw new ResourceNotFoundException("User", "id", String.valueOf(userId));

//    return this.userRepo.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "id", String.valueOf(userId)));
  }

  @Override
  public List<User> getAllUsers() {
    return this.userRepo.findAll();
  }

  @Override
  public void deleteUser(Long userId) {
    User user = this.userRepo.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "id", String.valueOf(userId)));
    this.userRepo.delete(user);
  }

  @Override
  public User findByEmail(String email) {
    return userRepo.findByEmail(email);
  }

}
