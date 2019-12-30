package skazka.repositories;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import java.io.Serializable;

@Entity
@IdClass(Visits.Id.class)
public class Visits {

    @javax.persistence.Id
    private Long clazzId;

    @javax.persistence.Id
    private Long clientId;

    @javax.persistence.Id
    private Integer year;

    @javax.persistence.Id
    private Integer month;

    private int visits;

    public Long getClazzId() {
        return clazzId;
    }

    public void setClazzId(Long clazzId) {
        this.clazzId = clazzId;
    }

    public Long getClientId() {
        return clientId;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }

    public int getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Integer getMonth() {
        return month;
    }

    public void setMonth(Integer month) {
        this.month = month;
    }

    public Integer getVisits() {
        return visits;
    }

    public void setVisits(Integer visits) {
        this.visits = visits;
    }

    public static class Id implements Serializable {
        private Long clazzId;

        private Long clientId;

        private Integer year;

        private Integer month;

        public Long getClazzId() {
            return clazzId;
        }

        public void setClazzId(Long clazzId) {
            this.clazzId = clazzId;
        }

        public Long getClientId() {
            return clientId;
        }

        public void setClientId(Long clientId) {
            this.clientId = clientId;
        }

        public Integer getYear() {
            return year;
        }

        public void setYear(Integer year) {
            this.year = year;
        }

        public Integer getMonth() {
            return month;
        }

        public void setMonth(Integer month) {
            this.month = month;
        }
    }
}
