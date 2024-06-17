package com.victor.proyectofinal.security;

import com.victor.proyectofinal.security.jwt.JwtAuthenticationFilter;
import com.victor.proyectofinal.security.jwt.JwtValidationFilter;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@AllArgsConstructor
@Configuration
public class SeguridadConfig {
    private final AuthenticationConfiguration authenticationConfiguration;

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    };

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        return http.authorizeHttpRequests((authorize) -> authorize
                        .requestMatchers(HttpMethod.GET, "/api/producto/categoria/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/categoria").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/producto").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/cliente").permitAll()
                        .requestMatchers(HttpMethod.GET, "/img/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/cliente/crear").permitAll()
                         .requestMatchers(HttpMethod.GET,"/api/direccion/direcciones").hasRole("USER")
                         .requestMatchers(HttpMethod.GET,"/api/pedido").hasRole("USER")
                         .requestMatchers(HttpMethod.GET,"/api/pedido/proveedores").hasRole("ADMIN")
                         .requestMatchers(HttpMethod.GET,"/api/direccion/buscar").hasRole("USER")
                         .requestMatchers(HttpMethod.GET,"/api/tarjeta").hasRole("USER")
                        .requestMatchers(HttpMethod.GET, "/api/cliente/obtenerAdmin").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST,"/api/direccion/crear").hasRole("USER")
                         .requestMatchers(HttpMethod.POST,"/api/pedido/crear").hasRole("USER")
                         .requestMatchers(HttpMethod.POST,"/api/tarjeta/crear").hasRole("USER")
                        .requestMatchers(HttpMethod.PATCH,"/api/cliente/actualizar").hasRole("USER")
                        .requestMatchers(HttpMethod.DELETE,"/api/tarjeta/**").hasRole("USER")
                        .requestMatchers(HttpMethod.DELETE,"/api/direccion/**").hasRole("USER")
//                        .requestMatchers("api/users/**").hasRole("ADMIN")
                        //.requestMatchers(HttpMethod.DELETE,"/api/users/{id}").hasRole("ADMIN")
                        .anyRequest().authenticated())
                .addFilter(new JwtAuthenticationFilter(authenticationConfiguration.getAuthenticationManager()))
                .addFilter(new JwtValidationFilter(authenticationConfiguration.getAuthenticationManager()))
                .csrf(AbstractHttpConfigurer::disable) // .csrf( config -> config.disable())
                .sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource(){

        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(Arrays.asList("http://localhost", "http://localhost:5173")); // Agrega el nuevo origen aquí
        config.setAllowedMethods(Arrays.asList("GET", "POST","PATCH","PUT","DELETE"));
        config.setAllowedHeaders(Arrays.asList("Authorization","Content-Type"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }

//    @Bean
//    FilterRegistrationBean<CorsFilter> corsFilter(){
//        FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<>(new CorsFilter());
//        bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
//        return bean;
//
//    }
}
