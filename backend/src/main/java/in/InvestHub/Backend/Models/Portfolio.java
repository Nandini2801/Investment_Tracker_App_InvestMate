package in.InvestHub.Backend.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "portfolio")
public class Portfolio {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private Date createdAt;
  private String category;
  private BigDecimal currentPrice;
  private BigDecimal createdPrice;


  @ManyToOne
  @JsonIgnore
  @JoinColumn(name = "user_id")
  private User user;

  @OneToMany(mappedBy = "portfolio")
  private List<Transaction> transactions;

  @OneToMany(mappedBy = "portfolio")
  private List<PortfolioStocks> stocks;
}
