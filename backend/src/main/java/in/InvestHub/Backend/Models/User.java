package in.InvestHub.Backend.Models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "User")
@NoArgsConstructor
@Getter
@Setter
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String fname;
  private String lname;
  private String dob;
  private String phone;
  private String email;
  private String gender;
  private String password;
  private String address;

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
  @JsonManagedReference
  private List<BankDetails> bankDetails;

  @OneToMany(mappedBy = "user")
  private List<Portfolio> portfolios;

  @OneToMany(mappedBy = "user")
  private List<Watchlist> watchlists;
}
