package sixman.helfit.domain.user.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import sixman.helfit.audit.Auditable;
import sixman.helfit.security.entity.ProviderType;
import sixman.helfit.security.entity.RoleType;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "USERS")
public class User extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(length = 64, nullable = false, unique = true)
    private String id;

    @JsonIgnore
    @Column(length = 128, nullable = false)
    private String password;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, length = 30)
    private String nickname;

    @Column(length = 512)
    private String profileImageUrl;

    private LocalDateTime lastLoggedIn;

    @Enumerated(value = EnumType.STRING)
    private EmailVerified emailVerifiedYn;

    @Enumerated(value = EnumType.STRING)
    private PersonalInfoAgreement personalInfoAgreementYn;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private RoleType roleType;

    @Enumerated(EnumType.STRING)
    private ProviderType providerType;

    @Enumerated(EnumType.STRING)
    private UserStatus userStatus = UserStatus.USER_ACTIVE;

    public User(
        String id,
        String email,
        String nickname,
        String profileImageUrl,
        EmailVerified emailVerifiedYn,
        PersonalInfoAgreement personalInfoAgreementYn,
        ProviderType providerType,
        RoleType roleType
    ) {
        this.id = id;
        this.email = email != null ? email : "NO_EMAIL";
        this.nickname = nickname != null ? nickname : "";
        this.password = "NO_PASS";
        this.profileImageUrl = profileImageUrl != null ? profileImageUrl : "";
        this.emailVerifiedYn = emailVerifiedYn;
        this.personalInfoAgreementYn = personalInfoAgreementYn;
        this.providerType = providerType;
        this.roleType = roleType;
    }

    public enum UserStatus {
        USER_ACTIVE("활동중"),
        USER_INACTIVE("휴면 상태"),
        USER_WITHDRAW("탈퇴 상태")
        ;

        @Getter
        private final String status;

        UserStatus(String status) {
            this.status = status;
        }
    }

    public enum PersonalInfoAgreement {
        Y
        ;
    }

    public enum Activate {
        Y
        ;
    }

    public enum EmailVerified {
        Y,
        N
        ;
    }
}
