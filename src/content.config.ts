import { defineCollection, z } from 'astro:content';
import { IDS_CATEGORIA, IDS_DIFICULDADE } from './data/taxonomia';

const colecaoProjetos = defineCollection({
  type: 'content',
  schema: () =>
    z.object({
      titulo: z.string().min(4),
      resumo: z.string().min(12).max(180),
      publicadoEm: z.coerce.date(),
      autor: z.object({
        nome: z.string().min(3),
        github: z.string().optional()
      }),
      dificuldade: z.enum(IDS_DIFICULDADE),
      idadeMinima: z.number().int().min(0),
      duracaoMinutos: z.number().int().positive(),
      categorias: z.array(z.enum(IDS_CATEGORIA)).min(1),
      tags: z.array(z.string().min(2)).default([]),
      destaque: z.boolean().default(false),
      capa: z.object({
        src: z.string().min(4),
        alt: z.string().min(8)
      }),
      galeria: z
        .array(
          z.object({
            src: z.string().min(4),
            alt: z.string().min(8)
          })
        )
        .default([]),
      materiais: z.array(z.string().min(2)).default([]),
      ferramentas: z.array(z.string().min(2)).default([]),
      passos: z
        .array(
          z.object({
            titulo: z.string().min(4),
            corpo: z.string().min(8),
            imagem: z.string().min(4).optional()
          })
        )
        .default([]),
      dicas: z
        .array(
          z.object({
            tom: z.enum(['info', 'warning', 'success']).default('info'),
            texto: z.string().min(4)
          })
        )
        .default([]),
      baixaveis: z
        .array(
          z.object({
            rotulo: z.string().min(3),
            arquivo: z.string().min(4),
            tipo: z.enum(['pdf', 'doc', 'zip']).default('pdf')
          })
        )
        .default([]),
      arquivos: z
        .array(
          z.object({
            rotulo: z.string().min(3),
            arquivo: z.string().min(4),
            tipo: z.enum(['stl', 'jpg', 'png', 'svg', 'zip', 'other']).default('other')
          })
        )
        .default([]),
      relacionados: z.array(z.string()).default([])
    })
});

export const collections = { projects: colecaoProjetos };
