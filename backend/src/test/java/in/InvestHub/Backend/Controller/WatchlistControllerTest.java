package in.InvestHub.Backend.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import in.InvestHub.Backend.Controllers.WatchlistController;
import in.InvestHub.Backend.Models.Watchlist;
import in.InvestHub.Backend.Services.WatchlistService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.eq;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@WebMvcTest(controllers = WatchlistController.class)
class WatchlistControllerTest {

    public static final String API_WATCHLIST = "/api/watchlists";

    @MockBean
    private WatchlistService watchlistService;

    @Autowired
    private MockMvc mockMvc;

    private Watchlist testWatchlist;

    private static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @BeforeEach
    void setUp() {
        testWatchlist = new Watchlist();
        testWatchlist.setId(1L);
        testWatchlist.setName("Test Watchlist");
        testWatchlist.setCategory("TEST");
    }

    @Test
    void testGetWatchlistById() throws Exception {
        Long watchlistId = 1L;
        Mockito.when(watchlistService.findWatchlistById(watchlistId)).thenReturn(testWatchlist);

        mockMvc.perform(get(API_WATCHLIST + "/{id}", watchlistId))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(testWatchlist.getId()))
                .andDo(MockMvcResultHandlers.print());

        verify(watchlistService).findWatchlistById(watchlistId);
    }

    @Test
    void testGetWatchlistByIdNotFound() throws Exception {
        Long watchlistId = 2L;
        Mockito.when(watchlistService.findWatchlistById(watchlistId)).thenReturn(null);

        mockMvc.perform(get(API_WATCHLIST + "/{id}", watchlistId))
                .andExpect(status().isNotFound())
                .andDo(MockMvcResultHandlers.print());

        verify(watchlistService).findWatchlistById(watchlistId);
    }

    @Test
    void testGetAllWatchlists() throws Exception {
        List<Watchlist> watchlistList = new ArrayList<>();
        watchlistList.add(testWatchlist);

        Mockito.when(watchlistService.findAllWatchlists()).thenReturn(watchlistList);

        mockMvc.perform(get(API_WATCHLIST + "/"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].id").value(testWatchlist.getId()))
                .andDo(MockMvcResultHandlers.print());

        verify(watchlistService).findAllWatchlists();
    }
    @Test
    void testGetWatchlistsByCategory() throws Exception {
        String category = "Sample Category";

        List<Watchlist> watchlistList = new ArrayList<>();
        watchlistList.add(testWatchlist);

        Mockito.when(watchlistService.getWatchlistsByCategory(category)).thenReturn(watchlistList);

        mockMvc.perform(get(API_WATCHLIST).param("category", category))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].id").value(testWatchlist.getId()))
                .andDo(MockMvcResultHandlers.print());

        verify(watchlistService).getWatchlistsByCategory(category);
    }

    @Test
    void testCreateWatchlist() throws Exception {
        Mockito.when(watchlistService.createWatchlist(any(Watchlist.class))).thenReturn(testWatchlist);

        mockMvc.perform(post(API_WATCHLIST + "/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(testWatchlist))
                )
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(testWatchlist.getId()))
                .andDo(MockMvcResultHandlers.print());

        verify(watchlistService).createWatchlist(any(Watchlist.class));
    }

    @Test
    void testUpdateWatchlist() throws Exception {
        Long watchlistId = 1L;
        Mockito.when(watchlistService.updateWatchlist(eq(watchlistId), any(Watchlist.class))).thenReturn(testWatchlist);

        mockMvc.perform(put(API_WATCHLIST + "/{id}", watchlistId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(testWatchlist))
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(testWatchlist.getId()))
                .andDo(MockMvcResultHandlers.print());

        verify(watchlistService).updateWatchlist(eq(watchlistId), any(Watchlist.class));
    }

    @Test
    void testUpdateWatchlistNotFound() throws Exception {
        Long watchlistId = 2L;
        Mockito.when(watchlistService.updateWatchlist(eq(watchlistId), any(Watchlist.class))).thenReturn(null);

        mockMvc.perform(put(API_WATCHLIST + "/{id}", watchlistId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(testWatchlist))
                )
                .andExpect(status().isNotFound())
                .andDo(MockMvcResultHandlers.print());

        verify(watchlistService).updateWatchlist(eq(watchlistId), any(Watchlist.class));
    }

    @Test
    void testDeleteWatchlist() throws Exception {
        Long watchlistId = 1L;

        mockMvc.perform(delete(API_WATCHLIST + "/{id}", watchlistId))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print());

        verify(watchlistService).deleteWatchlist(watchlistId);
    }
}
