package com.victor.proyectofinal.security;

import com.victor.proyectofinal.entity.Cliente;
import com.victor.proyectofinal.repositories.ClienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service("userDetailsService")
public class UserDetailsServiceImpl implements UserDetailsService {

    private final ClienteRepository clienteRepository;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        Cliente cliente = clienteRepository.buscarPorUsernameOEmail(s)
                .orElseThrow(() -> new UsernameNotFoundException("Cliente no encontrado"));

        return User.builder()
                .username(cliente.getUsername())
                .password(cliente.getPassword())
                .authorities(cliente.getRols().stream()
                        .map(rol -> new SimpleGrantedAuthority(rol.getNombre()))
                        .collect(Collectors.toSet()))
                .disabled(false)
                .build();

    }

}
