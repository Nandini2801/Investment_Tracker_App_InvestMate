package in.InvestHub.Backend.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Transaction {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private Long stockId;
  private String stockName;
  private String action;
  private Integer quantity;
  private Date date;

  @ManyToOne
  @JsonIgnore
  @JoinColumn(name = "portfolio_id")
  private Portfolio portfolio;

}
