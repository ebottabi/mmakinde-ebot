"""empty message

Revision ID: 84cebdce5df3
Revises: 
Create Date: 2017-10-17 01:38:39.227567

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '84cebdce5df3'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('roles',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=60), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('title')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=60), nullable=True),
    sa.Column('fullName', sa.String(length=60), nullable=True),
    sa.Column('roleId', sa.Integer(), nullable=True),
    sa.Column('password_hash', sa.String(length=128), nullable=True),
    sa.Column('is_admin', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['roleId'], ['roles.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_users_fullName'), 'users', ['fullName'], unique=False)
    op.create_index(op.f('ix_users_email'), 'users', ['email'], unique=True)
    op.create_table('documents',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=60), nullable=True),
    sa.Column('access', sa.String(length=60), nullable=True),
    sa.Column('roleId', sa.Integer(), nullable=True),
    sa.Column('ownerId', sa.Integer(), nullable=True),
    sa.Column('content', sa.String(length=200), nullable=True),
    sa.ForeignKeyConstraint(['ownerId'], ['users.id'], ),
    sa.ForeignKeyConstraint(['roleId'], ['roles.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('access'),
    sa.UniqueConstraint('title')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('documents')
    op.drop_index(op.f('ix_users_email'), table_name='users')
    op.drop_index(op.f('ix_users_fullName'), table_name='users')
    op.drop_table('users')
    op.drop_table('roles')
    # ### end Alembic commands ###
