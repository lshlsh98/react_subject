package kr.co.iei.common.auth;

import java.security.Key;
import java.util.Date;

import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;


@Component
public class JwtTokenProvider {

	private final String secretKey;
	private final int expireHour;
	private Key SECRET_KEY;
	
	public JwtTokenProvider(@Value("${jwt.secret-key}") String secretKey, @Value("${jwt.expire-hour}") int expireHour) {
		this.secretKey = secretKey;
		this.expireHour = expireHour;
		this.SECRET_KEY = new SecretKeySpec(java.util.Base64.getDecoder().decode(secretKey), SignatureAlgorithm.HS512.getJcaName());
	}
	
	public String createToken(String email, int role) {
		Claims claims = (Claims) Jwts.claims().setSubject(email);
		claims.put("role", role);
		Date now = new Date();
		String token = Jwts.builder()
				.setClaims(claims)
				.setIssuedAt(now)
				.setExpiration(new Date(now.getTime() + expireHour * 60 * 60 * 1000L))
				.signWith(SECRET_KEY)
				.compact();
		
		return token;
	}//
}
