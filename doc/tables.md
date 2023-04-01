# Les Tables de notre application!
## La table List

| **Nom**    | **Type**   | **Null?** | **Default**           | **Commentaires**   |
|------------|------------|-----------|-----------------------|--------------------|
| id         | INTEGER    | non       | GENERATED AS IDENTITY | clé primaire       |
| name       | TEXT       | non       | non                   |                    |
| position   | INTEGER    | non       | 0                     |                    |
| created_at | TIMETAMPTZ | non       | NOW()                 |                    |
| update_at  | TIMETAMPTZ | oui       | non                   | géré par Sequelize |

## La table Card

| **Nom**    | **Type**   | **Null?** | **Default**           | **Commentaires**                       |
|------------|------------|-----------|-----------------------|----------------------------------------|
| id         | INTEGER    | non       | GENERATED AS IDENTITY | clé primaire                           |
| content    | TEXT       | non       | non                   | le contenu de la carte donc son texte  |
| color      | TEXT       | non       | "#FFF"                |                                        |
| position   | INTEGER    | non       | 0                     |                                        |
| list_id    | INTEGER    | non       |                       | clé étrangère vers la table list       |
| created_at | TIMETAMPTZ | non       | NOW()                 |                                        |
| update_at  | TIMETAMPTZ | oui       | non                   | géré par Sequelize                     |

## La table Tag
| **Nom**    | **Type**   | **Null?** | **Default**           | **Commentaires**   |
|------------|------------|-----------|-----------------------|--------------------|
| id         | INTEGER    | non       | GENERATED AS IDENTITY | clé primaire       |
| name       | TEXT       | non       | non                   | le nom du tag      |
| color      | TEXT       | non       | "#FFF"                |                    |
| created_at | TIMETAMPTZ | non       | NOW()                 |                    |
| update_at  | TIMETAMPTZ | oui       | non                   | géré par Sequelize |

## La table d'association entre Card et Tag : card_has_tag
| **Nom**    | **Type**   | **Null?** | **Default**           | **Commentaires**        |
|------------|------------|-----------|-----------------------|-------------------------|
| card_id    | INTEGER    | non       | GENERATED AS IDENTITY | clé étrangère vers card |
| tag_id     | INTEGER    | non       | GENERATED AS IDENTITY | clé étrangère vers tag  |
| created_at | TIMETAMPTZ | non       | NOW()                 |                         |
| update_at  | TIMETAMPTZ | oui       | non                   | géré par Sequelize      |

