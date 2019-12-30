package skazka.repositories;


import com.fasterxml.jackson.annotation.JsonInclude;

import javax.persistence.*;
import java.util.*;

@Entity
@Table(name="clients")
@NamedEntityGraph(name = "Client.clazzes",
        attributeNodes = @NamedAttributeNode("clazzes"))
public class Client {

    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private Date created;
    private Date updated;
    private String name;
    private String surname;
    private String patronymic;
    private Date birthday;
    private String mobile1;
    private String mobile2;
    private String email;
    private String address;
    private String passport;
    private long source;
    private String parentName;
    private String parentSurname;
    private String parentPatronymic;
    private String parentMobile1;
    private String parentMobile2;
    private String notes;
    private Boolean active;

    @Enumerated(EnumType.STRING)
    private Sex sex;

    @ManyToMany
    @JoinTable(
            name = "client_to_clazz",
            joinColumns = @JoinColumn(name = "client_id"),
            inverseJoinColumns = @JoinColumn(name = "clazz_id"))
    private List<Clazz> clazzes;


    public boolean hasClazz(Clazz c) {

        for(Clazz clazz : clazzes) {
            if(clazz.getId() == c.getId()) {
                return true;
            }
        }

        return false;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public Date getUpdated() {
        return updated;
    }

    public void setUpdated(Date updated) {
        this.updated = updated;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getPatronymic() {
        return patronymic;
    }

    public void setPatronymic(String patronymic) {
        this.patronymic = patronymic;
    }

    public String getMobile1() {
        return mobile1;
    }

    public void setMobile1(String mobile1) {
        this.mobile1 = mobile1;
    }

    public String getMobile2() {
        return mobile2;
    }

    public void setMobile2(String mobile2) {
        this.mobile2 = mobile2;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPassport() {
        return passport;
    }

    public void setPassport(String passport) {
        this.passport = passport;
    }

    public long getSource() {
        return source;
    }

    public void setSource(long source) {
        this.source = source;
    }

    public String getParentName() {
        return parentName;
    }

    public void setParentName(String parentName) {
        this.parentName = parentName;
    }

    public String getParentSurname() {
        return parentSurname;
    }

    public void setParentSurname(String parentSurname) {
        this.parentSurname = parentSurname;
    }

    public String getParentPatronymic() {
        return parentPatronymic;
    }

    public void setParentPatronymic(String parentPatronymic) {
        this.parentPatronymic = parentPatronymic;
    }

    public String getParentMobile1() {
        return parentMobile1;
    }

    public void setParentMobile1(String parentMobile1) {
        this.parentMobile1 = parentMobile1;
    }

    public String getParentMobile2() {
        return parentMobile2;
    }

    public void setParentMobile2(String parentMobile2) {
        this.parentMobile2 = parentMobile2;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public Sex getSex() {
        return sex;
    }

    public void setSex(Sex sex) {
        this.sex = sex;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Boolean isActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public List<Clazz> getClazzes() {
        return clazzes;
    }

    public void setClazzes(List<Clazz> clazzes) {
        this.clazzes = clazzes;
    }

}

