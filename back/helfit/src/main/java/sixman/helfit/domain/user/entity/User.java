package sixman.helfit.domain.user.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import sixman.helfit.domain.comment.entity.Comment;
import sixman.helfit.security.entity.ProviderType;
import sixman.helfit.security.entity.RoleType;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "USERS")
public class User {
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

    @Column(length = 30)
    private String nickname;

    @Column(length = 512)
    private String profileImageUrl;

    @Column(length = 8)
    private Integer birth;

    private Integer height;
    private Integer weight;

    @Enumerated(value = EnumType.STRING)
    private EmailVerified emailVerifiedYn;

    @Enumerated(value = EnumType.STRING)
    private Gender gender;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private RoleType roleType;

    @Enumerated(EnumType.STRING)
    private ProviderType providerType;

    public User(
        String id,
        String email,
        String nickname,
        String profileImageUrl,
        Integer birth,
        Integer height,
        Integer weight,
        EmailVerified emailVerifiedYn,
        Gender gender,
        ProviderType providerType,
        RoleType roleType
    ) {
        this.id = id;
        this.email = email != null ? email : "NO_EMAIL";
        this.nickname = nickname != null ? nickname : "";
        this.password = "NO_PASS";
        this.emailVerifiedYn = emailVerifiedYn;
        this.profileImageUrl = profileImageUrl != null ? profileImageUrl : "";
        this.birth = birth;
        this.height = height;
        this.weight = weight;
        this.gender = gender;
        this.providerType = providerType;
        this.roleType = roleType;
    }

    public enum EmailVerified {
        Y,
        N
        ;
    }

    public enum Gender {
        MALE,
        FEMALE,
        ;
    }

    @OneToMany(mappedBy = "user")
    private List<Comment> comments = new ArrayList<>();
}
