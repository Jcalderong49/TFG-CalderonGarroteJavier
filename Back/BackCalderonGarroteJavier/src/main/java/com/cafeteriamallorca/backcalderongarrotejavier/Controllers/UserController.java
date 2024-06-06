package com.cafeteriamallorca.backcalderongarrotejavier.Controllers;

import com.cafeteriamallorca.backcalderongarrotejavier.Services.UserService;
import com.cafeteriamallorca.backcalderongarrotejavier.model.User;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public User save(@RequestBody User user){
        return userService.save(user);
    }

    @GetMapping("/{id}")
    public User findById(@PathVariable Integer id){
        return userService.findById(id);
    }
}
