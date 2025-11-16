package com.sanjeeban.ApiGateway.filters;


import com.sanjeeban.ApiGateway.service.JwtService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class AuthenticationGatewayFilterFactory extends AbstractGatewayFilterFactory<AuthenticationGatewayFilterFactory.Config> {
    private final JwtService jwtService;

    public AuthenticationGatewayFilterFactory(JwtService jwtService1) {
        super(Config.class);
        this.jwtService = jwtService1;
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {

            if(!config.isEnabled) return chain.filter(exchange);

            String auth = exchange.getRequest().getHeaders().getFirst("Authorization");

            if (auth == null) {
                exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                return exchange.getResponse().setComplete();
            }

            String token = auth.replace("Bearer", "").trim();
            String userName = jwtService.getUsernameFromToken(token);

            ServerHttpRequest mutatedRequest = exchange.getRequest()
                    .mutate()
                    .header("X-User-Id", userName)
                    .build();

            return chain.filter(exchange.mutate().request(mutatedRequest).build());
        };
    }


    public static class Config{
        private boolean isEnabled;
        public boolean isEnabled() {
            return isEnabled;
        }
        public void setEnabled(boolean enabled) {
            isEnabled = enabled;
        }
    }

}
