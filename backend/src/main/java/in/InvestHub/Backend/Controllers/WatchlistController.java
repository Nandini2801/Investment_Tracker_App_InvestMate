package in.InvestHub.Backend.Controllers;

import in.InvestHub.Backend.Models.User;
import in.InvestHub.Backend.Models.Watchlist;
import in.InvestHub.Backend.Services.WatchlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/watchlists")
public class WatchlistController {
    private final WatchlistService watchlistService;

    @Autowired
    public WatchlistController(WatchlistService watchlistService) {
        this.watchlistService = watchlistService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Watchlist> getWatchlistById(@PathVariable Long id) {
        Watchlist watchlist = watchlistService.findWatchlistById(id);
        if (watchlist != null) {
            return ResponseEntity.ok(watchlist);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping(path = "", params = "category")
    public ResponseEntity<List<Watchlist>> getWatchlistsByCategory(@RequestParam String category) {
        List<Watchlist> watchlists = watchlistService.getWatchlistsByCategory(category);

        if (watchlists.isEmpty()) {
            return ResponseEntity.noContent().build(); // Return a 204 No Content response if no watchlists found
        } else {
            return ResponseEntity.ok(watchlists); // Return a 200 OK response with the list of watchlists
        }
    }

    @GetMapping("/")
    public List<Watchlist> getAllWatchlists() {
        return watchlistService.findAllWatchlists();
    }

    @PostMapping("/")
    public ResponseEntity<Watchlist> createWatchlist(@RequestBody Watchlist watchlist) {
        Watchlist createdWatchlist = watchlistService.createWatchlist(watchlist);
        return new ResponseEntity<>(createdWatchlist, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Watchlist> updateWatchlist(@PathVariable Long id, @RequestBody Watchlist updatedWatchlist) {
        Watchlist updated = watchlistService.updateWatchlist(id, updatedWatchlist);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWatchlist(@PathVariable Long id) {
        watchlistService.deleteWatchlist(id);
        return ResponseEntity.ok().build();
    }
}
