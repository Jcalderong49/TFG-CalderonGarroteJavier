package com.cafeteriamallorca.backcalderongarrotejavier.jwt;

import com.cafeteriamallorca.backcalderongarrotejavier.PaypalService.CustomUserDetailService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import static com.cafeteriamallorca.backcalderongarrotejavier.jwt.Constants.*;

public class JWTValidate {
    public static boolean tokenExists(HttpServletRequest request) {
        String header = request.getHeader(HEADER_AUTHORIZATION);
        return header != null && header.startsWith(TOKEN_BEARER_PREFIX);
    }

    public static Claims JWTValid(HttpServletRequest request) {
        String jwtToken = request.getHeader(HEADER_AUTHORIZATION).replace(TOKEN_BEARER_PREFIX, "");
        return Jwts.parserBuilder()
                .setSigningKey(getSignedKey(SUPER_SECRET_KEY))
                .build()
                .parseClaimsJws(jwtToken)
                .getBody();
    }

    public static void setAuthentication(Claims claims, CustomUserDetailService customUserDetailService) {
        UserDetails userDetails = customUserDetailService.loadUserByUsername(claims.getSubject());
        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
