 package com.crave.backend.integration;

 import com.crave.backend.model.UserOrder;
 import com.crave.backend.service.UserOrderService;
 import com.crave.backend.controller.UserOrderController;
 import org.junit.jupiter.api.Test;
 import org.springframework.beans.factory.annotation.Autowired;
 import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
 import org.springframework.boot.test.mock.mockito.MockBean;
 import org.springframework.http.MediaType;
 import org.springframework.security.core.userdetails.User;
 import org.springframework.security.test.context.support.WithMockUser;
 import org.springframework.test.web.servlet.MockMvc;

 import java.util.Optional;

 import static org.mockito.ArgumentMatchers.any;
 import static org.mockito.ArgumentMatchers.eq;
 import static org.mockito.Mockito.when;
 import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
 import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

 @WebMvcTest(UserOrderController.class)
 public class UserOrderControllerIntegrationTest {

     @Autowired
     private MockMvc mockMvc;

     @MockBean
     private UserOrderService userOrderService;

     @Test
     public void testCreateOrder() throws Exception {
         UserOrder userOrder = new UserOrder();
         // Mocking the service response
         when(userOrderService.createOrder(any(UserOrder.class))).thenReturn(userOrder);

         mockMvc.perform(post("/userOrders")
                 .contentType(MediaType.APPLICATION_JSON)
                 .content("{}"))
                 .andExpect(status().isCreated())
                 .andExpect(jsonPath("$.id").exists());
     }
 }


//package com.crave.backend.integration;
//
//import org.junit.Test;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.extension.ExtendWith;
//import static org.junit.jupiter.api.Assertions.*;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.mock.web.MockServletContext;
//import org.springframework.test.context.ContextConfiguration;
//import org.springframework.test.context.junit.jupiter.SpringExtension;
//import org.springframework.test.context.web.WebAppConfiguration;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.MvcResult;
//import org.springframework.test.web.servlet.setup.MockMvcBuilders;
//import org.springframework.web.context.WebApplicationContext;
//
//import com.crave.backend.controller.UserOrderController;
//import com.founder.core.config.ApplicationConfig;
//
//@ExtendWith(SpringExtension.class)
//@ContextConfiguration(classes = { ApplicationConfig.class })
//@WebAppConfiguration
//public class UserOrderControllerIntegrationTest {
//    @Autowired
//    private WebApplicationContext webApplicationContext;
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @BeforeEach
//    public void setup() throws Exception {
//        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.webApplicationContext).build();
//    }
//
//    @Test
//    public void givenWac_whenServletContext_thenItProvidesGreetController() {
//        MockServletContext servletContext = webApplicationContext.getServletContext();
//
//        Assert.assertNotNull(servletContext);
//        Assert.assertTrue(servletContext instanceof MockServletContext);
//        Assert.assertNotNull(webApplicationContext.getBean("greetController"));
//    }
//    // @Test
//    // public void placeOrder() {
//    //     MvcResult mvcResult = this.mockMvc.perform(get("/orders"))
//    //     .andDo(print()).andExpect(status().isOk());
//    //     // .andExpect(jsonPath("$.message").value("Hello World!!!"))
//    //     // .andReturn();
//
//    //     Assert.assertEquals("application/json;charset=UTF-8",
//    //     mvcResult.getResponse().getContentType());
//    // }
//}
