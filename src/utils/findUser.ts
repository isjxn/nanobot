import { User } from "../entity/User";

async function findUser(userId, username) {
    var user = await User.findOneBy({ discordId: userId });

    if (!user) {
        user = new User();
        user.discordId = userId;
        user.discordUsername = username;
        user.gillAmount = 100;
        await user.save();
    }

    return user;
}

export default findUser;