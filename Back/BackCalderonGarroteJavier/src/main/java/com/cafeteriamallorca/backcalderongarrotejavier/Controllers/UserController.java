package com.cafeteriamallorca.backcalderongarrotejavier.Controllers;

import com.cafeteriamallorca.backcalderongarrotejavier.Model.User;
import com.cafeteriamallorca.backcalderongarrotejavier.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
//http://localhost:8086
@RequestMapping("/api/v1/users")
//http://localhost:8086/api/v1/users
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {

        this.userService = userService;
    }

    @PostMapping
    public User save(@RequestBody User user){

        return userService.save(user);
    }

    //http://localhost:8085/api/v1/users/4
    @GetMapping("/{id}")
    public User findById(@PathVariable Integer id){

        return userService.findById(id);
    }
}
