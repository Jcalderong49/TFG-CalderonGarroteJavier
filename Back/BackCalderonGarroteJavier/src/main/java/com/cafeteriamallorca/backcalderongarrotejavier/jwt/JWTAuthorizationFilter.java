package com.cafeteriamallorca.backcalderongarrotejavier.jwt;

import com.cafeteriamallorca.backcalderongarrotejavier.PaypalService.CustomUserDetailService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;


@Component
@Slf4j
public class JWTAuthorizationFilter extends OncePerRequestFilter {
    private CustomUserDetailService customUserDetailService;

    public JWTAuthorizationFilter(CustomUserDetailService customUserDetailService) {
        this.customUserDetailService = customUserDetailService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try{
            if(JWTValidate.tokenExists(request, response)){
                Claims claims = JWTValidate.JWTValid(request);
                if (claims.get("authorities") != null){
                    JWTValidate.setAuthetication(claims, customUserDetailService);
                }else
                {
                    SecurityContextHolder.clearContext();
                }
            }else{
                SecurityContextHolder.clearContext();
            }
            filterChain.doFilter(request, response);

        }catch (ExpiredJwtException | UnsupportedJwtException | MalformedJwtException e){
            log.info("doFilterInternal {}", e.toString());
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.sendError(HttpServletResponse.SC_FORBIDDEN);
            return;
        }

    }
}
