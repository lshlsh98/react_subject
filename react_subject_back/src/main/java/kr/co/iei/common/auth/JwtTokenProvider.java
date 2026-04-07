package kr.co.iei.common.auth;

import java.security.Key;
import java.util.Date;

import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;


@Component
public class JwtTokenProvider {

	private final String secretKey;
	private final int expireHour;
	private Key SECRET_KEY;
	

	public JwtTokenProvider(@Value("${jwt.secret-key}") String secretKey, @Value("${jwt.expire-hour}") int expireHour) {

		this.secretKey = secretKey;
		this.expireHour = expireHour;
		this.SECRET_KEY = Keys.hmacShaKeyFor(
			    Decoders.BASE64.decode(secretKey)
			);
	}
	
	public String createToken(String email, int role) {
	    Date now = new Date();

	    String token = Jwts.builder()
	            .subject(email)
	            .claim("role", role)
	            .issuedAt(now)
	            .expiration(new Date(now.getTime() + expireHour * 60 * 60 * 1000L))
	            .signWith(SECRET_KEY)
	            .compact();

	    return token;
	}//
}
