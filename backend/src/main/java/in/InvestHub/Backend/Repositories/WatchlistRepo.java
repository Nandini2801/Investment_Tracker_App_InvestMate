package in.InvestHub.Backend.Repositories;
import in.InvestHub.Backend.Models.Watchlist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface WatchlistRepo extends JpaRepository<Watchlist, Long> {
    List<Watchlist> findByCategory(String category);
}