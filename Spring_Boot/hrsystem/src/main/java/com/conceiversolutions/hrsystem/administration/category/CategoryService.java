package com.conceiversolutions.hrsystem.administration.category;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.conceiversolutions.hrsystem.administration.task.Task;
import com.conceiversolutions.hrsystem.administration.tasklistitem.TaskListItem;
import com.conceiversolutions.hrsystem.administration.tasklistitem.TaskListItemService;
import com.conceiversolutions.hrsystem.user.user.User;
import com.conceiversolutions.hrsystem.user.user.UserRepository;
import com.conceiversolutions.hrsystem.user.user.UserService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final TaskListItemService taskListItemService;
    private final UserService userService;
    private final UserRepository userRepository;

    public List<Category> getCategories() {
        List<Category> categories = categoryRepository.findAll();
        for (Category category : categories) {
            for (Task task : category.getTasks()) {
                task.setCategory(null);
                // task.setTaskListItems(new ArrayList<>());
                for (TaskListItem taskListItem : task.getTaskListItems()) {
                    taskListItem.setUser(null);
                    taskListItem.setTask(null);
                }
            }
        }
        return categories;
    }

    public Category getCategoryById(Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalStateException("Category with ID: " + categoryId + " does not exist!"));
        for (Task task : category.getTasks()) {
            task.setCategory(null);
            task.setTaskListItems(new ArrayList<>());
        }
        return category;
    }

    public void addNewCategory(Category category) {
        Optional<Category> categoryOptional = categoryRepository.findCategoryByName(category.getName());
        if (categoryOptional.isPresent()) {
            throw new IllegalStateException("Category name already exists!");
        }
        categoryRepository.saveAndFlush(category);
    }

    public void deleteCategory(Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalStateException("Category with ID: " + categoryId + " does not exist!"));
        if (!category.getTasks().isEmpty()) {
            throw new IllegalStateException("Unable to delete as category contains tasks");
        }
        categoryRepository.deleteById(categoryId);
    }

    @Transactional
    public void editCategory(Long categoryId, String categoryName) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalStateException("Category with ID: " + categoryId + " does not exist!"));
        if (categoryName != null && categoryName.length() > 0 && !Objects.equals(category.getName(), categoryName)) {
            category.setName(categoryName);
        }
    }

    public void assignTaskToEmployeeByCategory(Long employeeId, Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalStateException("Category with ID: " + categoryId + " does not exist!"));
        User user = userRepository.findById(employeeId)
                .orElseThrow(() -> new IllegalStateException("User with ID: " + employeeId + " does not exist!"));

        for (Task task : category.getTasks()) {
            // Boolean hasTask = false;
            // List<User> employees = userService.getEmployeesWithTask(task.getTaskId());
            // for (User employee : employees) {
            // if (employee.getUserId() == employeeId) {
            // hasTask = true;
            // }
            // }
            // if (!hasTask) {
            // taskListItemService.addNewTaskListItem(new TaskListItem(false), employeeId,
            // task.getTaskId());
            // }
            List<User> employees = userService.getEmployeesWithTask(task.getTaskId());
            if (employees.contains(user)) {

            } else {
                taskListItemService.addNewTaskListItem(new TaskListItem(false), employeeId, task.getTaskId());
            }
        }

    }

}
