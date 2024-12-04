package in.InvestHub.Backend.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Watchlist {
  @Id
  private Long id;

  @ManyToOne
  @JsonIgnore
  @JoinColumn(name = "user_id")
  private User user;

  private String name;
  private String category;

  @OneToMany(mappedBy = "watchlist")
  private List<WatchlistStocks> watchlistStocks;
}
