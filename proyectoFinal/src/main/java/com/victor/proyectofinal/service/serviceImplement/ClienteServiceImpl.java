package com.victor.proyectofinal.service.serviceImplement;

import com.victor.proyectofinal.bean.BeanCopyUtils;
import com.victor.proyectofinal.dto.cliente.ClienteCreateDto;
import com.victor.proyectofinal.dto.cliente.ClienteMapper;
import com.victor.proyectofinal.dto.cliente.ClienteUpdateCorreoUsernameDto;
import com.victor.proyectofinal.dto.cliente.ClienteViewDto;
import com.victor.proyectofinal.entity.Cliente;
import com.victor.proyectofinal.entity.Rol;
import com.victor.proyectofinal.repositories.ClienteRepository;
import com.victor.proyectofinal.repositories.RolRepository;
import com.victor.proyectofinal.service.serviceInterfaz.ClienteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class ClienteServiceImpl implements ClienteService {
    private final ClienteRepository clienteRepository;
    private final RolRepository rolRepository;
    private final PasswordEncoder passwordEncoder;
    private final ClienteMapper mapper;


    @Override
    public Cliente save(ClienteCreateDto cliente) {
        Cliente clienteGuardado = mapper.toEntity(cliente);
        clienteGuardado.setPassword(passwordEncoder.encode(clienteGuardado.getPassword()));
        // Asegurarse de que la lista de roles no es null
        // Buscar el rol "ROLE_USER"
        Rol rolUser = rolRepository.findByNombre("ROLE_USER")
                .orElseThrow(() -> new RuntimeException("Rol ROLE_USER no encontrado"));

        // Asegurarse de que el conjunto de roles no es null
        if (clienteGuardado.getRols() == null) {
            clienteGuardado.setRols(new HashSet<>());
        }
        // Añadir el rol al conjunto de roles
        clienteGuardado.getRols().add(rolUser);
        // Guardar el cliente en el repositorio y devolverlo
        return clienteRepository.save(clienteGuardado);

    }

    @Override
    public List<ClienteViewDto> findAll() {
        List<Cliente> clientes = clienteRepository.findAll();
        if (clientes.isEmpty()) {
            throw new RuntimeException("No se encontraron clientes.");
        }
        return  mapper.toDtoList(clientes);
    }


    public Cliente obtenerClientePorToken (){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = (String) authentication.getPrincipal();
        Cliente cliente = clienteRepository.buscarPorUsernameOEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Cliente no encontrado"));
        return cliente;
    }

    @Override
    public Cliente actualizarCliente(ClienteUpdateCorreoUsernameDto clienteUpdateCorreoUsernameDto) {
        Cliente clienteSource = mapper.toEntity(clienteUpdateCorreoUsernameDto);
        Cliente clienteTarget = obtenerClientePorToken();
        log.info("QUE HAY AQUI" + clienteTarget.getRols());
        clienteSource.setRols(clienteTarget.getRols());
        clienteSource.setDirecciones(clienteTarget.getDirecciones());
        clienteSource.setTarjetas(clienteTarget.getTarjetas());
        clienteSource.setPedido(clienteTarget.getPedido());
        BeanCopyUtils.copyNonNullProperties(clienteSource, clienteTarget);
        return clienteRepository.save(clienteTarget);
    }

    @Override
    public Optional<Cliente> buscarPorUsernameOEmail(String s) {
        return clienteRepository.buscarPorUsernameOEmail(s);
    }
}
