package in.InvestHub.Backend.Services;

import in.InvestHub.Backend.Exception.ResourceNotFoundException;
import in.InvestHub.Backend.Models.User;
import in.InvestHub.Backend.Repositories.UserRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

  @Mock
  private UserRepo userRepo;

  @InjectMocks
  private UserServiceImpl userService;

  private User sampleUser;

  @BeforeEach
  public void setUp() {
    sampleUser = new User();
    sampleUser.setId(1L);
    sampleUser.setFname("John");
    sampleUser.setLname("Doe");
    sampleUser.setEmail("johndoe@example.com");
    sampleUser.setPassword("password");
  }



  @Test
  public void testUpdateUser() {
    Long userId = sampleUser.getId();
    User updatedUser = new User();
    updatedUser.setFname("UpdatedFirstName");

    when(userRepo.findById(userId)).thenReturn(Optional.of(sampleUser));
    when(userRepo.save(sampleUser)).thenReturn(updatedUser);

    User result = userService.updateUser(updatedUser, userId);

    assertNotNull(result);
    assertEquals("UpdatedFirstName", result.getFname());

    verify(userRepo, times(1)).findById(userId);
    verify(userRepo, times(1)).save(sampleUser);
  }

  @Test
  public void testGetUserByIdNotFound() {
    Long userId = 2L;
    when(userRepo.existsById(userId)).thenReturn(false);

    assertThrows(ResourceNotFoundException.class, () -> userService.getUserById(userId));

    verify(userRepo, times(1)).existsById(userId);
  }

  @Test
  public void testGetAllUsers() {
    List<User> userList = new ArrayList<>();
    userList.add(sampleUser);
    when(userRepo.findAll()).thenReturn(userList);

    List<User> result = userService.getAllUsers();

    assertNotNull(result);
    assertEquals(userList, result);

    verify(userRepo, times(1)).findAll();
  }

  @Test
  public void testDeleteUser() {
    Long userId = sampleUser.getId();

    when(userRepo.findById(userId)).thenReturn(Optional.of(sampleUser));

    userService.deleteUser(userId);

    verify(userRepo, times(1)).findById(userId);
    verify(userRepo, times(1)).delete(sampleUser);
  }

  @Test
  public void testDeleteUserNotFound() {
    Long userId = 2L;
    when(userRepo.findById(userId)).thenReturn(Optional.empty());

    assertThrows(ResourceNotFoundException.class, () -> userService.deleteUser(userId));

    verify(userRepo, times(1)).findById(userId);
    verify(userRepo, never()).delete(any());
  }

  @Test
  public void testFindByEmail() {
    String email = sampleUser.getEmail();
    when(userRepo.findByEmail(email)).thenReturn(sampleUser);

    User result = userService.findByEmail(email);

    assertNotNull(result);
    assertEquals(sampleUser, result);

    verify(userRepo, times(1)).findByEmail(email);
  }
}
