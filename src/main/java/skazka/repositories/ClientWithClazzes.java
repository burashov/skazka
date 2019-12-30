package skazka.repositories;

import java.util.List;
import java.util.Map;

public class ClientWithClazzes {

    private Client client;

    private List<HasClazz> clazzes;

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public List<HasClazz> getClazzes() {
        return clazzes;
    }

    public void setClazzes(List<HasClazz> clazzes) {
        this.clazzes = clazzes;
    }


    public static class HasClazz {

        private Clazz clazz;

        private boolean hasClazz;

        public HasClazz() {

        }

        public HasClazz(Clazz clazz, boolean hasClazz) {
            this.clazz = clazz;
            this.hasClazz = hasClazz;
        }

        public Clazz getClazz() {
            return clazz;
        }

        public void setClazz(Clazz clazz) {
            this.clazz = clazz;
        }

        public boolean isHasClazz() {
            return hasClazz;
        }

        public void setHasClazz(boolean hasClazz) {
            this.hasClazz = hasClazz;
        }
    }
}
