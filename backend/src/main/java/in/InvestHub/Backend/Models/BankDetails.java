package in.InvestHub.Backend.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "bankdetails")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BankDetails {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String accNo;
  private String ifsc;
  private String bankname;
  private String branchname;

  @ManyToOne
  @JsonBackReference
//  @JsonIgnore
  @JoinColumn(name = "user_id")
  private User user;

}
