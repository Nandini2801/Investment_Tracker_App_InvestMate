package in.InvestHub.Backend.Payloads;

import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {
  @Value("${jwt.secret}")
  private String jwtSecret;

  @Value("${jwt.expirationMs}")
  private long jwtExpirationMs;

  public String generateToken(String email) {
    Date now = new Date();
    Date expirationDate = new Date(now.getTime() + jwtExpirationMs);

    Map<String, Object> claims = new HashMap<>();
    claims.put("email", email);

    return Jwts.builder()
               .setClaims(claims)
               .setSubject(email)
               .setIssuedAt(now)
               .setExpiration(expirationDate)
               .compact();
  }

  public String extractEmail(String token) {
    return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
  }

  public boolean validateToken(String token) {
    try {
      Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
      return true;
    } catch (Exception e) {
      return false;
    }
  }
}
