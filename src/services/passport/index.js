import LocalStrategy from "passport-local";
import User from "../../api/user/model";
import { sign } from "../jwt";
import { jwtSecret } from "../../config";
import { responseError, responseStatus } from "../../utils";
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

export const initializePassport = async (passport) => {
  const authenticateUser = async (email, password, done) => {
    const user = await User.findOne({ email });
    if (user === null)
      return done(
        { status: responseStatus.notFound, message: responseError.wrongEmail },
        false
      );
    try {
      if (!(await user.validatePassword(password))) {
        return done(
          {
            status: responseStatus.unAuthorized,
            message: responseError.wrongPassword,
          },
          false
        );
      }
      const token = sign(user.toJSON());
      return done(null, token);
    } catch (err) {
      return done(err);
    }
  };
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
      },
      authenticateUser
    )
  );

  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwtSecret,
      },
      async (jwtPayload, done) => {
        const user = await User.findById(jwtPayload._id);
        if (!user) return done(null, false);
        return done(null, user);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
