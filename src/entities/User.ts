import { DataTypes, Model, Optional } from 'sequelize';
import db from '../database/index';

export interface IDbUser {
    id: number;
    role: string;
    name: string;
    email: string;
    premuim: number;
    email_verified_at: Date;
    pack_name: string;
    pack_id: string;
    transaction_id: string;
    start_at: string;
    expired_in: string;
    password: string;
    remember_token: string;
    created_at: Date;
    updated_at: Date;
    stripe_id: string;
    card_brand: string;
    card_last_four: string;
    trial_ends_at: Date;
    id_discord: number;
    manual_premuim: number;
    provider_name: string;
    provider_id: string;
    type: string;
    avatar: string;
}

export interface IDbUserCreationAttributes extends Optional<IDbUser,
      'id'
    | 'role'
    | 'email_verified_at'
    | 'pack_name'
    | 'pack_id'
    | 'transaction_id'
    | 'start_at'
    | 'expired_in'
    | 'remember_token'
    | 'created_at'
    | 'updated_at'
    | 'stripe_id'
    | 'card_brand'
    | 'card_last_four'
    | 'trial_ends_at'
    | 'id_discord'
    | 'manual_premuim'
    | 'provider_name'
    | 'provider_id'
    | 'type'
    | 'avatar'
> {}

export interface IDbUserInstance
    extends Model<IDbUser, IDbUserCreationAttributes>,
        IDbUser {}

const User = db.define<IDbUserInstance>('users', {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    role: {
        type: DataTypes.STRING(191),
        allowNull: false,
        defaultValue: 'user'
    },
    name: {
        type: DataTypes.STRING(191),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(191),
        allowNull: false,
    },
    premuim: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    email_verified_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    },
    pack_name: {
        type: DataTypes.STRING(191),
        allowNull: true,
        defaultValue: null
    },
    pack_id: {
        type: DataTypes.STRING(191),
        allowNull: true,
        defaultValue: null
    },
    transaction_id: {
        type: DataTypes.STRING(191),
        allowNull: true,
        defaultValue: null
    },
    start_at: {
        type: DataTypes.STRING(191),
        allowNull: true,
        defaultValue: null
    },
    expired_in: {
        type: DataTypes.STRING(191),
        allowNull: true,
        defaultValue: null
    },
    password: {
        type: DataTypes.STRING(191),
        allowNull: false
    },
    remember_token: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: null
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
    },
    stripe_id: {
        type: DataTypes.STRING(191),
        allowNull: true,
        defaultValue: null
    },
    card_brand: {
        type: DataTypes.STRING(191),
        allowNull: true,
        defaultValue: null
    },
    card_last_four: {
        type: DataTypes.STRING(4),
        allowNull: true,
        defaultValue: null
    },
    trial_ends_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    },
    id_discord: {
        type: DataTypes.BIGINT,
        allowNull: true,
        defaultValue: null
    },
    manual_premuim: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: '0'
    },
    provider_name: {
        type: DataTypes.STRING(191),
        allowNull: true,
        defaultValue: null
    },
    provider_id: {
        type: DataTypes.STRING(191),
        allowNull: true,
        defaultValue: null
    },
    type: {
        type: DataTypes.STRING(191),
        allowNull: true,
        defaultValue: null
    },
    avatar: {
        type: DataTypes.STRING(191),
        allowNull: true,
        defaultValue: null
    }
},
{
    indexes: [
        {
            unique: true,
            name: 'users_email_unique',
            fields: ['email']
        },
        {
            name: 'users_stripe_id_index',
            fields: ['stripe_id']
        }
    ],
    timestamps: false
});

User.sync();

export default User;